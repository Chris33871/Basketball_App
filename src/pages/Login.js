import React from "react";

//API and AWS
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
Amplify.configure(awsExports);

function LoginPage() {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <div className="App">
            <p>Hey {user.attributes.email}, welcome to my work!</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(LoginPage);
