"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const SignUpCard = () => {
	const onProviderSignUp = (provider: "github" | "google") => {
		signIn(provider, { callbackUrl: "/" });
	};
	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Create an account to continue</CardTitle>
				<CardDescription>
					Use your email or other services to create an account
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5 px-0 pb-0">
				<div className="flex flex-col gap-y-2.5">
					<Button
						onClick={() => onProviderSignUp("github")}
						variant="outline"
						size="lg"
						className="w-full relative"
					>
						<FaGithub className="mr-2 size-5 top-2.5 left-2.5 absolute" />
						Continue with GitHub
					</Button>
					<Button
						onClick={() => onProviderSignUp("google")}
						variant="outline"
						size="lg"
						className="w-full relative"
					>
						<FcGoogle className="mr-2 size-5 top-2.5 left-2.5 absolute" />
						Continue with Google
					</Button>
				</div>
				<p className="text-xs text-muted-foreground ">
					Already have an account?
					<Link href="/sign-in">
						<span className="text-sky-700 hover:underline">Sign in</span>
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};
