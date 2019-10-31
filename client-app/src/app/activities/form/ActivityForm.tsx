import React, { useState, FormEvent, useContext, useEffect } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { IActivity } from '../../models/activity'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import ActivityStore from '../../stores/activityStore'
import { RouteComponentProps } from 'react-router'
interface DetailParams {
    id: string
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history,
}) => {
    const activityContext = useContext(ActivityStore)
    const {
        createActivity,
        editActivity,
        submitting,
        activity: initialFormState,
        loadActivity,
        clearActivity,
    } = activityContext

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    })

    useEffect(() => {
        const { id } = match.params
        // using activity.id.length stops memory leaks
        if (id && activity.id.length === 0) {
            loadActivity(id).then(
                () => initialFormState && setActivity(initialFormState)
            )
        }
        return () => {
            clearActivity()
        }
    }, [
        loadActivity,
        clearActivity,
        match.params,
        match.params.id,
        initialFormState,
        activity.id.length,
    ])

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            const newActivity = {
                ...activity,
                id: uuid(),
            }
            createActivity(newActivity).then(() =>
                history.push(`/activities/${newActivity.id}`)
            )
        } else {
            editActivity(activity).then(() =>
                history.push(`/activities/${activity.id}`)
            )
        }
    }

    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget
        setActivity({ ...activity, [name]: value })
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <Form onSubmit={() => handleSubmit()}>
                        <Form.Input
                            onChange={event => handleInputChange(event)}
                            name="title"
                            placeholder="Title"
                            value={activity.title}
                        />
                        <Form.TextArea
                            onChange={event => handleInputChange(event)}
                            name="description"
                            rows={2}
                            placeholder="Description"
                            value={activity.description}
                        />
                        <Form.Input
                            onChange={event => handleInputChange(event)}
                            name="category"
                            placeholder="Category"
                            value={activity.category}
                        />
                        <Form.Input
                            onChange={event => handleInputChange(event)}
                            name="date"
                            type="datetime-local"
                            placeholder="Date"
                            value={activity.date}
                        />
                        <Form.Input
                            onChange={event => handleInputChange(event)}
                            name="city"
                            placeholder="City"
                            value={activity.city}
                        />
                        <Form.Input
                            onChange={event => handleInputChange(event)}
                            name="venue"
                            placeholder="Venue"
                            value={activity.venue}
                        />

                        <Button
                            loading={submitting}
                            floated="right"
                            positive
                            type="submit"
                            content="SUBMIT"
                        />
                        <Button
                            onClick={() => history.push('/activities')}
                            floated="right"
                            type="button"
                            content="Cancel"
                        />
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm)
