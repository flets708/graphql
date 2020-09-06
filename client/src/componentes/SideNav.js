import React from "react";
import { Card, CardHeader, CardBody, Form, FormGroup, Button } from "reactstrap";
import { useQuery, useMutation } from "@apollo/client"
import { useForm } from 'react-hook-form';

import { DIRECTOR_LIST, ADD_MOVIE, ADD_DIRECTOR, MOVIE_LIST } from '../queries/query'

export function SideNav() {
    const {data} = useQuery(DIRECTOR_LIST)
    const { register, handleSubmit } = useForm(); // initialize the hook
    // const { register:registerDirector, handleSubmit:handleSubmitDirector } = useForm(); // initialize the hook
    const [addMovie]  = useMutation(ADD_MOVIE, { refetchQueries: [{ query: MOVIE_LIST}], awaitRefetchQueries: true})
    const [addDirector] = useMutation(ADD_DIRECTOR, { refetchQueries: [{ query: DIRECTOR_LIST}], awaitRefetchQueries: true})
    const onMovieSubmit = ({movieName, movieGenre, directorId}, e) => {
        addMovie({ variables: {name:movieName, genre:movieGenre, directorId}}) //directorId:は名前が同じなので省略可能
        e.target.reset()
      };
    const onDirectorSubmit = ({directorName, directorAge}, e) => {
        const IntAge = parseInt(directorAge)
        addDirector({variables: {name: directorName, age:IntAge}})
        e.target.reset()
    };
    return (
        <div>
            <Card>
                <CardHeader>
                    映画監督
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onDirectorSubmit)}>
                        <FormGroup>
                            <input className="form-control" type="text" name="directorName" placeholder="監督" ref={register}/>
                        </FormGroup>
                        <FormGroup>
                            <input className="form-control" type="number" name="directorAge" placeholder="年齢" ref={register}/>
                        </FormGroup>
                        <Button color="primary" type="submit">追加</Button>
                        
                    </Form>
                </CardBody>
            </Card>
            <Card className="mt-4">
                <CardHeader>
                    映画作品
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onMovieSubmit)}>
                        <FormGroup>
                            <input className="form-control" type="text" name="movieName" placeholder="タイトル" ref={register}/>
                        </FormGroup> 
                        <FormGroup>
                            <input className="form-control" type="text" name="movieGenre" placeholder="ジャンル" ref={register}/>
                        </FormGroup>
                        <FormGroup>
                            <select className="form-control"  type="select" name="directorId" ref={register}>
                                {
                                    data && data.directors.map(({id, name}) => (
                                        <option key={id} value={id}>{name}</option>
                                    ))
                                }
                            </select>
                        </FormGroup>
                        <Button color="primary" type="submit">追加</Button>
                        
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
