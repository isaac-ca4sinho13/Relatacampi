"# Relatacampi" 

#Rodar o db
Abrir outro terminal
cd server
npx json-server --watch db.json --port 3001

#Rodar o projeto
npm i
npm i @react-native-async-storage/async-storage
npm i expo-image-picker 
npx expo start --web
