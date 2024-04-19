FROM node:18-alpine



#install Dependecies 
COPY package*.json ./

# run                          
RUN npm install

#bundle app source 
COPY . .


CMD ["npm","start"]