import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

const cityCoordinates = {
    guayaquil: { latitude: -2.170998, longitude: -79.922359 },
    quito: { latitude: -0.180653, longitude: -78.467834 },
    manta: { latitude: -0.967653, longitude: -80.708910 },
    cuenca: { latitude: -2.900128, longitude: -79.005896 },
};

const defaultCoordinates = cityCoordinates.guayaquil;

export default function useFetchData(cityInput: string): OpenMeteoResponse {
    const coordinates = cityCoordinates[cityInput as keyof typeof cityCoordinates] ?? defaultCoordinates;
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`;

    const [data, setData] = useState<OpenMeteoResponse>({
        latitude: 0,
        longitude: 0,
        generationtime_ms: 0,
        utc_offset_seconds: 0,
        timezone: '',
        timezone_abbreviation: '',
        elevation: 0,
        hourly_units: {
            time: '',
            temperature_2m: '',
            relative_humidity_2m: '',
            apparent_temperature: '',
            wind_speed_10m: '',
        },
        hourly: {
            time: [],
            temperature_2m: [],
            relative_humidity_2m: [],
            apparent_temperature: [],
            wind_speed_10m: [],
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL);
            const result: OpenMeteoResponse = await response.json();
            setData(result);
        };

        fetchData();
    }, [URL]);

    return data;
}