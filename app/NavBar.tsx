'use client'
import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        {href: "/", label: "Dashboard"},
        {href: "/issues/list", label: "Issues"},
    ];

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
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
        </nav>

    );
};

export default NavBar;