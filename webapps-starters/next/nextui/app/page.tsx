"use client";

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import { Camera } from 'lucide-react';

import {Listbox, ListboxItem} from "@nextui-org/listbox";
// import {ListboxWrapper} from "./ListboxWrapper";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";
import {
  Button
} from "@nextui-org/button";


export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-black dark">


			<div className="">
				<Dropdown>
				  <DropdownTrigger>
					<Button
					  variant="bordered"
					>
					  Open Menu
					  <Camera className="text-red-500 w-4 h-4 ml-4" />
					</Button>
				  </DropdownTrigger>
				  <DropdownMenu aria-label="Static Actions">
					<DropdownItem key="new">New file</DropdownItem>
					<DropdownItem key="copy">Copy link</DropdownItem>
					<DropdownItem key="edit">Edit file</DropdownItem>
					<DropdownItem key="delete" className="text-danger" color="danger">
					  Delete file
					</DropdownItem>
				  </DropdownMenu>
				</Dropdown>
			</div>

			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					websites regardless of your design experience.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Beautiful, fast and modern React UI library.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						Get started by editing <Code color="primary">app/page.tsx</Code>
					</span>
				</Snippet>
			</div>
		</section>
	);
}
