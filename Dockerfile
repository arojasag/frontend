FROM node:22-alpine

WORKDIR /Swarch2A_Frontend

COPY package*.json ./
RUN npm install

COPY . .

#prod -> production; dev -> dev
ARG mode=prod
ENV mode=${mode}

RUN if [ "$mode" = "prod" ]; then npm run build; fi

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$mode\" = \"dev\" ]; then npm run dev; else npm run start; fi"]
