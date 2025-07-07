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
ARG APP_MODE=prod
ENV APP_MODE=${APP_MODE}

EXPOSE 3000

RUN echo "Running in $APP_MODE mode"

RUN npm run pre:${APP_MODE}

CMD [\
	"sh", "-c",\
	"npm run ${APP_MODE:prod}"\
	]
