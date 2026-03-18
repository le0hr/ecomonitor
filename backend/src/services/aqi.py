def calculate_aqi_subindex(cp, breakpoints):
    for c_low, c_high, i_low, i_high in breakpoints:
        if c_low <= cp <= c_high:
            return ((i_high - i_low) / (c_high - c_low)) * (cp - c_low) + i_low
    last_bp = breakpoints[-1]
    if cp > last_bp[1]:
        return last_bp[3]
    return 0


def get_final_aqi(data_ppm):
    config = {
        "co": [(0, 4.4, 0, 50), (4.5, 9.4, 51, 100), (9.5, 12.4, 101, 150), (12.5, 15.4, 151, 200), (15.5, 50, 201, 500)],
        "alcohol": [(0, 10, 0, 50), (11, 30, 51, 100), (31, 70, 101, 150), (71, 150, 151, 200), (151, 1000, 201, 500)],
        "co2": [(400, 600, 0, 50), (601, 1000, 51, 100), (1001, 1500, 101, 150), (1501, 2500, 151, 200), (2501, 5000, 201, 500)],
        "toluene": [(0, 0.2, 0, 50), (0.3, 1.0, 51, 100), (1.1, 5.0, 101, 150), (5.1, 15.0, 151, 200), (15.1, 100, 201, 500)],
        "nh3": [(0, 10, 0, 50), (11, 20, 51, 100), (21, 35, 101, 150), (36, 50, 151, 200), (51, 200, 201, 500)],
        "acetone": [(0, 50, 0, 50), (51, 150, 51, 100), (151, 300, 101, 150), (301, 500, 151, 200), (501, 2000, 201, 500)],
    }

    for gas, ppm in data_ppm.items():
        if gas in config:
            data_ppm[gas] = round(calculate_aqi_subindex(ppm, config[gas]))
    return data_ppm
