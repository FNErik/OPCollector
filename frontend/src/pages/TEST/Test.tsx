import React, { Fragment, useEffect, useState } from 'react';

const Test = () => {
    const [expansions, setExpansions] = useState<any>([]);
    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('https://api.cardtrader.com/api/v2/expansions', {
                headers: {Authorization: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJjYXJkdHJhZGVyLXByb2R1Y3Rpb24iLCJzdWIiOiJhcHA6MTAzNjUiLCJhdWQiOiJhcHA6MTAzNjUiLCJleHAiOjQ4NzE4Njk5NjYsImp0aSI6IjlmZTMyNzU4LTRmZjEtNDJiOS05NmY5LWU1YjNlOTkyOGY2ZSIsImlhdCI6MTcxNjE5NjM2NiwibmFtZSI6IkxpbmtlciBBcHAgMjAyNDA1MjAxMTEyNDIifQ.Dzd5p7DJENxgVPf0skDPGx_oANXTBFkvh4lv60pf9i6vDBGNYuRjMKtcUGz4laL4e6P561sRsvKdHRB_bLhC4eh_3wOqyXKovx8lx6mbbDKu00AOkif-k2tG68mNHcFtq69eqarOjNuA0tiVCVHrMyJxI-YnFnrWfXGL8JWLSd0X02h_y_B8ycgaHKOk63bQB658lXss2SZJRqWkKWXPbpZ_peeOTMl7aizVHvl3cWEziN9mBt_alzyPCyN8cU8pAhv5bqjgNB-sNoVifwPoNVfyn3uoX6Wba8m0ICVu6P4urTlO-yDZRSpufq0DP6ReJral5OTKmB79urjkNluz4A'

                }
            });
            if (response.ok) {
                const jsonData = await response.json();
                setExpansions(jsonData);
                console.log(jsonData);
            } else {
                console.error("XD");
            }
        }
        fetchGames()
    }, [])

    useEffect(() => {
        const expFiltered = expansions && expansions.filter(expansion => expansion.game_id === 15)
        console.log(expFiltered);
        
    }, [expansions])
    return(
        <Fragment>
            <h1>Test</h1>
        </Fragment>
    )
}

export default Test;