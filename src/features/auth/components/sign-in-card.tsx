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

export const SignInCard = () => {
	const onProviderSignIn = (provider: "github" | "google") => {
		signIn(provider, { callbackUrl: "/" });
	};
	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Log in to continue</CardTitle>
				<CardDescription>
					Use your email or other services to log in
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-5 px-0 pb-0">
				<div className="flex flex-col gap-y-2.5">
					<Button
						onClick={() => onProviderSignIn("github")}
						variant="outline"
						size="lg"
						className="w-full relative"
					>
						<FaGithub className="mr-2 size-5 top-2.5 left-2.5 absolute" />
						Continue with GitHub
					</Button>
					<Button
						onClick={() => onProviderSignIn("google")}
						variant="outline"
						size="lg"
						className="w-full relative"
					>
						<FcGoogle className="mr-2 size-5 top-2.5 left-2.5 absolute" />
						Continue with Google
					</Button>
				</div>
				<p className="text-xs text-muted-foreground ">
					Don&apos;t have an account?{" "}
					<Link href="/sign-up">
						<span className="text-sky-700 hover:underline">Sign up</span>
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};
