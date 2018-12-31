const keys = require('../../config/keys');
module.exports = (id, token) => {
  return (
    `<html>
      <body>
        <div style="text-align: center">
          <p>This address was recently used to sign up for YelpCamp.</p>
          <div>
            If you did <a href="${keys.redirectDomain}/verify/${id}/${token}">Click Here</a>
          </div>
          <div>
            Otherwise simply ignore this message.
          </div>
        </div>
      </body>
    </html>`
  );
};
