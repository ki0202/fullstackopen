import os
import uvicorn
from datetime import datetime
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, ORJSONResponse, PlainTextResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, root_validator


class Person(BaseModel):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    number: str

class PersonPost(BaseModel):
    name: str
    number: str

    @root_validator()
    def verify_password_match(cls,values):
        name = values.get("name")
        number = values.get("number")

        if not name:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="name missing")
        elif not number:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="number missing")
        elif name in [x.name for x in app.state.persons]:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="name must be unique")
        return values


app = FastAPI()

app.mount("/static", StaticFiles(directory=f"{os.path.dirname(__file__)}/build/static", html=True), name="static")


@app.on_event("startup")
async def startup_event():
    app.state.persons = [
        Person(id=1, name="Arto Hellas", number="040-123456"),
        Person(id=2, name="Ada Lovelace", number="39-44-5323523"),
        Person(id=3, name="Dan Abramov", number="12-43-234345"),
        Person(id=4, name="Mary Poppendieck", number="39-23-6423122"),
    ]
    app.state.max_id = max([phone.id for phone in app.state.persons])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", response_class=HTMLResponse)
async def root():
    return FileResponse(f"{os.path.dirname(__file__)}/build/index.html")


@app.get("/info", response_class=PlainTextResponse)
async def get_info():
    return f"""Phonebook has info for {len(app.state.persons)} people \n{datetime.now()}"""


@app.get("/api/persons", response_class=ORJSONResponse)
async def all_persons():
    return app.state.persons


@app.get("/api/persons/{phone_id}", response_class=ORJSONResponse)
async def get_person(phone_id: int):
    result = [person for person in app.state.persons if person.id == phone_id]
    if len(result) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"person with id = {phone_id} not found")
    return result


@app.delete("/api/persons/{phone_id}", status_code=status.HTTP_204_NO_CONTENT)
async def del_person(phone_id: int):
    app.state.persons = [person for person in app.state.persons if person.id != phone_id]


@app.post("/api/persons", response_model=Person)
async def create_person(new_person: PersonPost):
    app.state.max_id += 1
    new_person = Person(id=app.state.max_id, **new_person.dict())
    app.state.persons.append(new_person)
    return new_person


if __name__ == "__main__":
    uvicorn.run("api:app", port=int(os.getenv("PORT", 3001)), reload=True, workers=3)
