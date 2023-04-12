import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#ee5656",
                brandAccent: "darkred",
              },
            },
          },
        }}
        theme="dark"
      />
    </div>
  );
};

export default Login;
