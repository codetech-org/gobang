from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == '__main__':
    import os
    import uvicorn

    ct_env = os.getenv("CT_ENV", "dev")
    if ct_env == "prod":
        uvicorn.run(app, host="0.0.0.0")  # noqa
    else:
        uvicorn.run(app)  # noqa
