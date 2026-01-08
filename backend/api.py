from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


# Payload will be json and then output. -> https://chatgpt.com/share/695ed5ca-1f50-8013-acad-619cbe284553
# endgoal: FE that interacts with this api and then we can return the output to the FE.
