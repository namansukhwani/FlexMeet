import { scheduledMeets } from '../../../data/scheduledMeetd'

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Process a POST request
        res.json({ status: true, data: scheduledMeets })
    } else {
        // Handle any other HTTP method
        res.status(400)
        res.json({ status: false, err: "unable to fetch data" })
    }
}