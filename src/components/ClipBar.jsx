
export const ClipBar=({chapters, highlights, setHighlights})=>{

    const handleSelect = (item) => {
        setHighlights((prev) => {
            const exists = prev.some((pre) => pre.id === item.id);

            return exists
                ? prev.filter((el) => el.id !== item.id)
                : [...prev, item]
        })
    }

    const isSelected=(id)=>{
        const findHighLight = highlights.find((item) => item.id === id);

        return findHighLight
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };

    return (
        <div className="space-y-2">
            {chapters.map((item) => (
                <div
                    key={item.id}
                    className={`rounded p-2 cursor-pointer transition ${
                        isSelected(item.id) ? 'bg-blue-500 text-white' : 'bg-white'
                    }`}
                    onClick={() => handleSelect(item)}
                >
                    <span className={`mr-2  ${
                        isSelected(item.id) ? 'text-white' : 'text-blue-500'
                    }` }>{formatTime(item.start)} - {formatTime(item.end)}</span>
                    <span>{item.text}</span>
                </div>
            ))}
        </div>
    )
}