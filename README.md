# docman-client

1. Create a file called `.env` in the root folder
2. Copy the content of `.env.example` and paste in the `.env` file
3. You should set the url of your server depending on the port you choose. If you don't set this value it will use the default `http://localhost:9000`
    ```
    REACT_APP_API_URL=http://localhost:9000
    ```

4. The following values are for firebase storage

    ```
    REACT_APP_FIREBASE_API_KEY=
    REACT_APP_FIREBASE_AUTH_DOMAIN=
    REACT_APP_FIREBASE_DATABASE_URL=
    REACT_APP_FIREBASE_PROJECT_ID=
    REACT_APP_FIREBASE_STORAGE_BUCKET=
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
    REACT_APP_FIREBASE_APP_ID=
    ```
    To get these values you should create a firebase storage bucket ([see how](https://firebase.google.com/docs/storage/web/start#create-default-bucket)). Firebase will give you values like this:
    ```js
    var firebaseConfig = {
      apiKey: '<your-api-key>',
      authDomain: '<your-auth-domain>',
      databaseURL: '<your-database-url>',
      storageBucket: '<your-storage-bucket-url>'
      projectId: '<your-project-url>',
      messagingSenderId: '<your-messagin-sender-id>',
      appId: '<your-app-id>',
    };
    ```
    Each of the above values match to the content of the `.env` file and you should save them like this

    ```
    REACT_APP_FIREBASE_API_KEY=...              #firebaseConfig.apiKey
    REACT_APP_FIREBASE_AUTH_DOMAIN=...          #firebaseConfig.authDomain
    REACT_APP_FIREBASE_DATABASE_URL=...         #firebaseConfig.databaseURL
    REACT_APP_FIREBASE_PROJECT_ID=...           #firebaseConfig.projectId
    REACT_APP_FIREBASE_STORAGE_BUCKET=...       #firebaseConfig.storageBucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...  #firebaseConfig.messagingSenderId
    REACT_APP_FIREBASE_APP_ID=................  #firebaseConfig.appId
    ```

5. Execute:
    ```
    npm i
    npm run start
    ```
