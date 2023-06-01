"use client";

import axios from "@/lib/axios";

const fetcher = (url, config) => axios(url, {
    ...config,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
}).then(res => res.data)

export default fetcher;