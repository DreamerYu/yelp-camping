const keys = require('../../config/keys');
module.exports = (id, passwordResetToken) => {
  return (
    `<html>
      <body>
        <div style="text-align: center">
          <p>Someone said they forgot their password and supplied this email.</p>
          <div>
            If you did <a href="${keys.redirectDomain}/passwordReset/${id}/${passwordResetToken}">Click Here</a>
          </div>
          <div>
            Otherwise simply ignore this message.
          </div>
        </div>
      </body>
    </html>`
  );
};
