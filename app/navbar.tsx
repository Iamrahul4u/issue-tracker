"use client"
import { Button, DropdownMenu } from "@radix-ui/themes"
import { Avatar } from "@radix-ui/themes"
import { Flex } from "@radix-ui/themes"
import { Text } from "@radix-ui/themes"
import { Box } from "@radix-ui/themes"
import { useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { AiFillBug } from "react-icons/ai"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
const links = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Issues",
    href: "/issue",
  },
]
const NavBar = () => {
  const { status, data: session } = useSession()
  return (
    <div className='flex space-x-6 items-center p-5 mb-5 border-b-2 justify-between'>
      <Flex gap='4' align={"center"}>
        <Link href='/'>
          <AiFillBug size={30} />
        </Link>
        {links.map((link) => {
          return (
            <li key={link.name} className='list-none'>
              <Link
                href={link.href}
                className='text-lg text-zinc-500 hover:text-zinc-800 transition-colors font-semibold'
              >
                {link.name}
              </Link>
            </li>
          )
        })}
      </Flex>
      <Box>
        {status === "loading" && (
          <div>
            <Skeleton width='2rem' height='2.1rem' className='rounded-full' />
          </div>
        )}
        {status === "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user!.image!}
                radius='full'
                fallback='?'
                size={"3"}
                className='cursor-pointer'
                referrerPolicy='no-referrer'
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <Text className='text-lg '>{session.user?.email}</Text>
              <Button>
                <Link href='/api/auth/signout'>Logout</Link>
              </Button>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
        {status === "unauthenticated" && (
          <Link href='/api/auth/signin'>Login</Link>
        )}
      </Box>
    </div>
  )
}

export default NavBar
