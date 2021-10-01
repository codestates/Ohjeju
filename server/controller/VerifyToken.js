const jwt = require('jsonwebtoken');
const Users = require('../models').users;

module.exports = {
  verifyToken: async (req) => { //요청에서 토큰 읽어서 해당 토큰의 유효성 검증하는 함수
    console.log('veri')
    const reqAccessToken = req.cookies.accessToken;
    const reqRefreshToken = req.cookies.refreshToken;

    let accessData, refreshData;

    try { accessData = jwt.verify(reqAccessToken, process.env.ACCESS_SECRET); }
    catch(err) { //accessToken이 만료된 경우

      try { refreshData = jwt.verify(reqRefreshToken, process.env.REFRESH_SECRET); }
      catch(err) { //refreshToken까지 만료된 경우
        return [null, null];
      }

      //accessToken은 만료되었지만 refreshToken은 유효한 경우
      //-> accessToken 재발급
      //-> access는 유효하지만 그 사이에 refresh가 만료되었을 경우에 대비해 refresh도 재발급
      const curUser = await Users.findOne({ where: { id: refreshData.id } })
      const newPayload = {
        id: curUser.id,
        email: curUser.email,
        userName: curUser.userName
      }

      const newAccessToken = jwt.sign(newPayload, process.env.ACCESS_SECRET, { expiresIn: '1h' });
      const newRefreshToken = jwt.sign(newPayload, process.env.REFRESH_SECRET, { expiresIn: '14d' });

      return [newAccessToken, newRefreshToken];
    }

    //accessToken이 유효한 경우
    //-> accessToken이 발급되는 시점엔 refreshToken도 함께 발급되기 때문에 항상 유효
    return [reqAccessToken, reqRefreshToken];
  },

  decodeToken: async (accessToken) => {
    //accessToken만 받아서 해당 토큰 안에 담긴 유저 데이터를 돌려주는 함수
    
    const verifyToken = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    const tokenUser = await Users.findOne({ where: { id: verifyToken.id } });

    if(!tokenUser) return null;
    else return tokenUser;
  }
}