import { useEffect, useState } from 'react';
import { CITY_OPTIONS, type CityKey, type OpenMeteoResponse } from '../types/DashboardTypes';

export interface FetchDataState {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const defaultCoordinates = CITY_OPTIONS.guayaquil;

export default function useFetchData(cityInput: CityKey): FetchDataState {
    const coordinates = CITY_OPTIONS[cityInput] ?? defaultCoordinates;
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`;

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(URL, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`La API respondió con estado ${response.status}`);
                }

                const result: OpenMeteoResponse = await response.json();
                setData(result);
            } catch (fetchError) {
                if (!controller.signal.aborted) {
                    setError(fetchError instanceof Error ? fetchError.message : 'No fue posible cargar los datos climáticos');
                    setData(null);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => controller.abort();
    }, [URL]);

    return { data, loading, error };
}