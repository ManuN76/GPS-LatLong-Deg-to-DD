window.function = function (lat, long, precision) {
  lat = lat.value ?? "";
  long = long.value ?? "";
  precision = precision.value ?? 15;

  // Supprime les espaces et multiligne & UpperCase
  lat = lat.trim();
  long = long.trim();
  lat = lat.toUpperCase();
  long = long.toUpperCase();

  // Sign si S, O, W
  let signLat = 1;

  if (
    lat.substring(0, 1) == "S" ||
    lat.substring(0, 1) == "O" ||
    lat.substring(0, 1) == "W"
  ) {
    signLat = -1;
  }

  let signLong = 1;

  if (
    long.substring(0, 1) == "S" ||
    long.substring(0, 1) == "O" ||
    long.substring(0, 1) == "W"
  ) {
    signLong = -1;
  }

  // Supprime les espaces & N & E & S & O (W)
  lat = lat.replace(/[\sNESOW"]/g, "");
  long = long.replace(/[\sNESOW"]/g, "");

  // Remplace ° " ' en \
  lat = lat.replace(/[°']/g, "/");
  long = long.replace(/[°']/g, "/");

  // Split
  let aLat = lat.split("/");
  let aLong = long.split("/");

  // Calcul Deg + (Min/60) + (Sec/3600) S & O & W = negative
  let nLat = parseFloat(
    signLat *
      (parseFloat(aLat[0]) +
        parseFloat(aLat[1]) / 60 +
        parseFloat(aLat[2]) / 3600)
  );

  let nLong = parseFloat(
    signLong *
      (parseFloat(aLong[0]) +
        parseFloat(aLong[1]) / 60 +
        parseFloat(aLong[2]) / 3600)
  );

  // Precision
  nLat = nLat.toFixed(precision);
  nLong = nLong.toFixed(precision);

  return nLat.toString() + "," + nLong.toString();
};
