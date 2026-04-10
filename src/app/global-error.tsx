"use client";

import NextError from "next/error";
import {useEffect} from "react";


export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <NextError statusCode={0} />
            </body>
        </html>
    );
}
