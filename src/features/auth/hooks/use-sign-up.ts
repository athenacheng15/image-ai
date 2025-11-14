import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<(typeof client.api.users)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.users)["$post"]>["json"];

export const useSignUp = () => {
	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async (json) => {
			const response = await client.api.users.$post({ json });
			if (!response.ok) {
				throw new Error("Failed to sign up");
			}
			return await response.json();
		},
		onError: () => {
			toast.error("Something went wrong");
		},
		onSuccess: () => {
			toast.success("Signed up successfully");
		},
	});

	return mutation;
};
