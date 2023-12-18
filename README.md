# OAuth2Server with Node.js, Express.js, and MySQL

Implementing an OAuth2 Server using Node.js, Express.js, and MySQL as the database.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/nurkhaliqfm/oauth2-server.git
    ```

2. **Install dependencies:**

    ```bash
    cd oauth2-server
    npm install
    ```

3. **Configure your MySQL database settings:**

    Update the database configuration in `config/config.js` with your MySQL credentials:

    ```javascript
    module.exports = {
      development: {
        username: 'your-mysql-username',
        password: 'your-mysql-password',
        database: 'oauth2_server',
        host: 'localhost',
        dialect: 'mysql',
      },
      // ... other configurations
    };
    ```

4. **Run the application:**

    ```bash
    npm start
    ```

    The OAuth2 Server will start running on `http://localhost:3000`.

5. **Test the setup:**

    Open your web browser and navigate to `http://localhost:3000` to verify that the server is up and running.

6. **Ready to use!**

    Your OAuth2 Server is now ready for use. Refer to the [Usage](#usage) section for information on how to integrate and use it in your applications.

## Important Links

- **Official Github:** [GitHub]([https://link-to-your-documentation](https://github.com/oauthjs/express-oauth-server))
- **Explanation About Oauth2:** [GitHub]([https://github.com/your-username/oauth2-server-node-express-mysql/issues](https://github.com/14gasher/oauth-example))
- **Other Example Not Using MySQL:** [GitHub]([https://github.com/node-oauth/express-oauth-server]))
- **Contribution Guidelines:** [Contribution Guidelines](CONTRIBUTING.md)
- **License:** [MIT License](LICENSE.md)

other documentation:
https://github.com/14gasher/oauth-example#flow-overview
