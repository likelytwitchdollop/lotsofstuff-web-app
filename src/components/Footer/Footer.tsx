'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'

const SOCIAL_MEDIA_LINKS = [
  { name: 'instagram', alt: 'Follow us on Instagram', src: '/images/iconmonstr-instagram-11.svg' },
  { name: 'twitter', alt: 'Follow us on Instagram', src: '/images/iconmonstr-twitter-1.svg' },
  { name: 'facebook', alt: 'Follow us on Instagram', src: '/images/iconmonstr-facebook-1.svg' },
]

const Footer = () => {
  return (
    <footer className='mt-auto flex flex-col items-center gap-y-12 lg:flex-row lg:justify-between lg:gap-y-0 py-12 border-t border-gray-200'>
      <div className='flex flex-col items-center lg:items-start gap-y-2'>
        <Link href='/'>
          <span className='font-bold text-3xl text-center'>lots-of-stuff</span>
        </Link>

        <p className='text-center' >follow us around the internet - 🌐</p>

        {/* Social media links */}
        <div className='flex flex-row items-center lg:items-start'>
          {SOCIAL_MEDIA_LINKS.map((link, index) => {
            const key = index
            const isLast = SOCIAL_MEDIA_LINKS.length - 1 === index

            return (
              <div key={key} className='flex flex-row items-center'>
                <a
                  href='/'
                  target='_blank'
                  rel='noreferrer'
                  onClick={(event) => {
                    event.preventDefault()
                    toast("These social links don't actually go anywhere...", { icon: '😅' })
                  }}
                >
                  <Image
                    priority
                    src={link.src}
                    height={20}
                    width={20}
                    alt={link.alt}
                  />
                </a>
                {!isLast && <div className='h-[20px] bg-black w-[4px] mx-4' />}
              </div>
            )
          })}
        </div>
      </div>

      <div className='lg:mt-auto'>
        <p>We hope you found some good stuff - 😉</p>
      </div>
    </footer>
  )
}

export default Footer