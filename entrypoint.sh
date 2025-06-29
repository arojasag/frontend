#!/bin/sh
if [ "$APP_MODE" = "dev" ]; then
    npm run dev
else
    npm run preview
fi