FROM node:18-alpine

#app directory
WORKDIR /app

#install Dependecies 
COPY package*.json ./

# run                          
RUN npm install

#bundle app source 
COPY . .

EXPOSE 8080

CMD ["npm","start"]