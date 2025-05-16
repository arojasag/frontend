FROM node:22-alpine

WORKDIR /Swarch2A_Frontend

COPY package*.json ./
RUN npm install

# Disable Next.js telemetry
RUN npx next telemetry disable

COPY . .

# The default value is `prod`
#   `prod` -> production
#   `dev` -> development
ARG mode=prod
ENV mode=${mode}

RUN echo "Running in $mode mode"
RUN if [ "$mode" = "prod" ]; then npm run build; fi

EXPOSE 3000

CMD ["sh", "-c", "if [ \"$mode\" = \"dev\" ]; then npm run dev; else npm run start; fi"]
