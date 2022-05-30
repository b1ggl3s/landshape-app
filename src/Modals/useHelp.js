import { useState } from 'react';

const useHelp = () => {
    const [isShowingHelp, setIsShowing] = useState(false);

    function toggleHelp() {
        setIsShowing(!isShowingHelp);
    }

    return {
        isShowingHelp,
        toggleHelp,
    }
};

export default useHelp;