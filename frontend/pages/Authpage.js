import { json, redirect } from "react-router-dom";
import Authentication from "../components/Auth/Authentication";

function AuthPage() {
  return (
    <>
      <Authentication />
    </>
  );
}

export default AuthPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }
  const data = await request.formData();
  let method = "POST";
  let authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  if (mode === "signup") {
    method = "PUT";
    authData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };
  }
  const res = await fetch("http://localhost:8080/auth/" + mode, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if (res.status === 422) {
    const resData = await res.json();
    return resData;
  }
  const resData = await res.json();
  if (resData && mode === "login") {
    localStorage.setItem("token", resData.token);
    localStorage.setItem("userId", resData.userId);
    localStorage.setItem("username", resData.username);
    localStorage.setItem("userEmail", resData.email);

    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1);
    localStorage.setItem("expiration", tokenExpiration.toISOString());

    return resData;
  }
  if (resData && mode === "signup") {
    return redirect("/auth?mode=login");
  }
}
