export default function fromChart(data) {
    return data.prices.map(([time, value]) => ({
        value: value,
        time: time,
    }));
}
