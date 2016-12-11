
function generateNoise(squareSize, level, revert, valueDivisor) {
  var noiseArr = new Array()
  var nbre = 10
  for(i = 0; i <= nbre; i++) {
    noiseArr[i] = new Array()
    for(j = 0; j <= nbre; j++) {
      var height = Math.random()
      if(i == 0 || j == 0 || i == nbre || j == nbre) height = 1
      noiseArr[i][j] = height
    }
  }
  return flatten(interpolate(noiseArr, squareSize), level, revert, valueDivisor)
}

function interpolate(points, squareSize) {
  var noiseArr = new Array()
  var x = 0;
  var y = 0;
  var perc = parseInt(squareSize)
  var size = perc * 10
  for(i = 0; i < size; i++) {
    if(i != 0 && i % perc == 0) x++
    noiseArr[i] = new Array();
    for(j = 0; j < size; j++) {
      if(j != 0 && j % perc == 0) y++;
      var mu_x = (i%perc) / perc;
      var mu_2 = (1 - Math.cos(mu_x * Math.PI)) / 2;
      var int_x1     = points[x][y] * (1 - mu_2) + points[x+1][y] * mu_2;
      var int_x2     = points[x][y+1] * (1 - mu_2) + points[x+1][y+1] * mu_2;
      var mu_y = (j%perc) / perc;
      var mu_2 = (1 - Math.cos(mu_y * Math.PI)) / 2;
      var int_y = int_x1 * (1 - mu_2) + int_x2 * mu_2;
      noiseArr[i][j] = int_y;
    }
    y = 0
  }
  return noiseArr
}

function flatten(points, level, revert, valueDivisor) {
  var valueDivisor = parseInt(valueDivisor)
  var level = parseInt(level)
  var maxVal = 1
  var step = maxVal / parseInt(level) // ref = 0.1
  var noiseArr = new Array()
  for(i = 0; i < points.length; i++) {
    noiseArr[i] = new Array()
    for(j = 0; j < points[i].length; j++) {
      for (k = 0; k <= level; k++) {
        var val = Math.round(step * k * 10) / 10
        if (val === maxVal) {
          if (revert) noiseArr[i][j] = maxVal / valueDivisor
          else noiseArr[i][j] = level / valueDivisor
          break
        } else if(points[i][j] < val) {
          if (revert) noiseArr[i][j] = ((level + 1) - k) / valueDivisor
          else noiseArr[i][j] = k / valueDivisor
          break
        }
      }
    }
  }
  return noiseArr
}

module.exports = generateNoise
