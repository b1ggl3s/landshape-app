import { useState } from 'react';

const useSettings = () => {
    const [isShowingSettings, setIsShowing] = useState(false);

    function toggleSettings() {
        setIsShowing(!isShowingSettings);
    }

    return {
        isShowingSettings,
        toggleSettings,
    }
};

export default useSettings;