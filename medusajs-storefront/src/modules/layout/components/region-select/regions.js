    'use clients'

    import { useRegions } from "medusa-react"
    import Link from "next/link"
    import { usePathname, useRouter } from "next/navigation"
    import { useState, useEffect } from "react"

    const Regions = () => {
    const { regions, isLoading } = useRegions()
    const router = useRouter()
    const pathname = usePathname()
    const cleanpath = "/" + pathname.split("/").slice(2).join("/");
    const urlregion = pathname.split("/")[1]

    const [ipAddress, setIpAddress] = useState(null);
    const [error, setError] = useState(null);
    const [country, setCountry] = useState(null)

    
    useEffect(() => {
        // Fetch the IP address from the API when the component mounts
        fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(data => {
            setIpAddress(data.ip);
        })
        .catch(err => {
            console.error("Error fetching IP address:", err);
            setError("Error fetching IP address");
        });
    }, []); // Empty dependency array to run effect only once

    useEffect(() => {
        // Fetch the IP address from the API when the component mounts
        fetch(`http://ip-api.com/json/${ipAddress}`)
        .then(response => response.json())
        .then(data => {
            setCountry(data.countryCode.toLowerCase());
        })
        .catch(err => {
            console.error("Error fetching country:", err);
            setError("Error fetching country");
        });
    }, [ipAddress]); // Empty dependency array to run effect only once


    return (
        <div>
        {isLoading && <span className="fixed right-8 top-8">Loading Regions</span>}
        {regions?.length && (
            <select className="fixed right-8 top-8"
            onChange={(e) => {
                    window.location.href=`/${e.target.value.toLowerCase()}${cleanpath}`;
                }}
                // onChange={(e) => {
                //     router.replace(`${e.target.value.toLowerCase()}${cleanpath}`);
                // }}
            >
                {regions.map((region) => (
                <option value={region.name} key={region.id} selected={`${region.name.toLowerCase() == urlregion ? 'selecte' : ''}`}>
                {region.name}
                </option>
                ))}
            </select>
        )}
        <div>{country}</div>
        </div>
    )
    }

    export default Regions
