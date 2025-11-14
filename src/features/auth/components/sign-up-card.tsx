"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const SignUpCard = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onCredentialsSignUp = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

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
				<form onSubmit={onCredentialsSignUp} className="space-y-2.5">
					<Input
						required
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						required
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						required
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						minLength={3}
						maxLength={20}
					/>
					<Button type="submit" className="w-full" size="lg">
						Continue
					</Button>
				</form>
				<Separator />
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
