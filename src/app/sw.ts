import {defaultCache} from "@serwist/next/worker";
import {
    BackgroundSyncPlugin,
    BackgroundSyncQueue,
    NetworkOnly,
    PrecacheEntry,
    Serwist,
    SerwistGlobalConfig,
    SerwistPlugin
} from "serwist";


declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        // Change this attribute's name to your \`injectionPoint\`.
        // \`injectionPoint\` is an InjectManifest option.
        // See https://serwist.pages.dev/docs/build/configuring
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: defaultCache,
    fallbacks: {
        entries: [
            {
                url: "/~offline",
                matcher({ request }) {
                    return request.destination === "document";
                },
            },
        ],
    },
});

const statusPlugin = {
    fetchDidSucceed({ response }) {
        if (response.status >= 500) {
            throw new Error("Server error.");
        }

        return response;
    },
} satisfies SerwistPlugin;

const backgroundSync = new BackgroundSyncPlugin("sw-bg-sync-plugin", {
    maxRetentionTime: 24 * 60,
});

serwist.registerCapture(
    /\/api\/.*\/*.json/,
    new NetworkOnly({
        plugins: [statusPlugin, backgroundSync],
    }),
    "POST",
);

const queue = new BackgroundSyncQueue("sw-bg-sync-queue");


self.addEventListener("install", serwist.handleInstall);

self.addEventListener("activate", (event: ExtendableEvent) => {
    self.clients.claim().then();
    serwist.handleActivate(event).then();
});

self.addEventListener("fetch", (event: FetchEvent) => {
    serwist.handleFetch(event);
});

self.addEventListener("fetch", (event: FetchEvent) => {
    if (event.request.method !== "POST") {
        return;
    }

    const backgroundSync = async () => {
        try {
            return await fetch(event.request.clone());
        } catch (error) {
            await queue.pushRequest({ request: event.request });
            return Response.error();
        }
    };

    event.respondWith(backgroundSync());
});

self.addEventListener("message", serwist.handleCache);

self.addEventListener("push", (event: PushEvent) => {
    if (event.data) {
        const data = event.data.json();

        const options = {
            body: data.body,
            icon: data.icon || "/icon.png",
            badge: data.badge || "/badge.png",
            image: data.image || "",
            vibrate: [100, 50, 100],
            data: {
                url: data.url || "/",
                dateOfArrival: Date.now(),
                primaryKey: 2,
            },
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );

        const resubscribeToPush = async () => {
            return self.registration.pushManager.getSubscription()
                .then(function(subscription) {
                    if (subscription) {
                        return subscription.unsubscribe();
                    }
                })
                .then(function() {
                    return self.registration.pushManager.subscribe({
                        userVisibleOnly: true,
                    });
                })
                .then(function(subscription) {
                    console.log('Resubscribed to push notifications:', subscription);
                    // Optionally, send new subscription details to your server
                })
                .catch(function(error) {
                    console.error('Failed to resubscribe:', error);
                });
        }

        event.waitUntil(resubscribeToPush());
    }
});

self.addEventListener("notificationclick", (event: NotificationEvent) => {
    event.notification.close();

    const url = event.notification.data?.url || "/";

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(url) && "focus" in client) {
                    return client.focus();
                }
            }

            if (self.clients.openWindow) {
                return self.clients.openWindow(url);
            }
        }),
    );
});

serwist.addEventListeners();
