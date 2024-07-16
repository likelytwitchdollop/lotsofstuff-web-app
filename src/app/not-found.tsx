import { Metadata } from "next";
import Link from "next/link";
import React from "react"

export const metadata: Metadata = {
  title: "404 - 😥, page not found | lots-of-stuff",
  description: "We've got lots of stuff. You should probably buy some - 😉.",
};

export default function NotFoundPage() {
  return (
    <section className="grid place-content-center space-y-12">
      <p className="text-center">
        😥
        <br />
        ...it looks like a 404.
        <br />
        <br />
        We couldn&apos;t find the page you&apos;re looking for.
        <br />
        Head back to the Homepage and take a look at some trending products below.
      </p>

      <Link href='/' className="font-bold text-center w-fit mx-auto hover:underline">
        Back to Homepage
      </Link>
    </section>
  )
}