export async function login(username, password) {
  const url = "/api/login";
  const data = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const responseData = await response.json();
    return responseData; // Assuming your server responds with some data upon successful login
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
