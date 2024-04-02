'use client'
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import DefaultAvatar from "@/app/DefaultAvatar";
import {Skeleton} from "@/app/components";

const NavBar = () => {
    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/"><AiFillBug/></Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
            </Container>
        </nav>

    );
};

const AuthStatus = () => {
    const {status, data: session} = useSession();

    if (status === "loading") return <Skeleton width="3rem"/>;

    if (status === "unauthenticated")
        return <Link className="nav-link" href="/api/auth/signin">Sign In</Link>;

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Box>
                        <Avatar src={session!.user!.image!} fallback={<DefaultAvatar/>}/>
                    </Box>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label className="my-2">
                        <Flex direction="column">
                            <Text size="2" weight="bold">
                                {session!.user!.name}
                            </Text>
                            <Text size="1">
                                {session!.user!.email}
                            </Text>
                        </Flex>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Sign Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
}

const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
        {href: "/", label: "Dashboard"},
        {href: "/issues/list", label: "Issues"},
    ];

    return <ul className="flex space-x-6">
        {links.map(link =>
            <li key={link.href}>
                <Link
                    href={link.href}
                    className={classNames({
                        'nav-link': true,
                        '!text-zinc-900': currentPath === link.href,
                    })}
                >
                    {link.label}
                </Link>
            </li>)}
    </ul>
}

export default NavBar;