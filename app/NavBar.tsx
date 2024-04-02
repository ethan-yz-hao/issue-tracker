'use client'
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import {Avatar, Box, Button, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import DefaultAvatar from "@/app/DefaultAvatar";

const NavBar = () => {
    const currentPath = usePathname();
    const {status, data: session} = useSession();
    console.log(session);

    const links = [
        {href: "/", label: "Dashboard"},
        {href: "/issues/list", label: "Issues"},
    ];

    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/"><AiFillBug/></Link>
                        <ul className="flex space-x-6">
                            {links.map(link =>
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={classNames({
                                            'text-zinc-900': currentPath === link.href,
                                            'text-zinc-500': currentPath !== link.href,
                                            'hover:text-zinc-900 transition-colors': true
                                        })}
                                    >
                                        {link.label}
                                    </Link>
                                </li>)}
                        </ul>
                    </Flex>
                    <Box>
                        {status === "authenticated" && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Box>
                                        <Avatar src={session!.user!.image!} fallback={<DefaultAvatar/>}/>
                                    </Box>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size="2">
                                            {session.user!.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href="/api/auth/signout">Sign Out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                        {status === "unauthenticated" && (
                            <Link href="/api/auth/signin">Sign In</Link>
                        )}
                    </Box>
                </Flex>
            </Container>
        </nav>

    );
};

export default NavBar;