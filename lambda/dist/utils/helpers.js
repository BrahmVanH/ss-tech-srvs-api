"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImgGalArr = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Hashes password for new user
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.hash(password, 8);
});
exports.hashPassword = hashPassword;
// Decrypts password for user login
const comparePassword = (enteredPassword, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.compare(enteredPassword, userPassword);
});
exports.comparePassword = comparePassword;
// Takes in alt tags, gallery image urls and header url from property pages and
// formats an array for image gallery in client
const createImgGalArr = (galleryAltTags, imageUrls, imageKeys) => {
    const galleryArray = imageUrls.map((url) => {
        const original = url;
        const imgKey = imageKeys[imageUrls.indexOf(url)];
        return {
            imgKey: imgKey,
            original: original,
            thumbnail: original,
            originalAlt: 'null',
            thumbnailAlt: 'null',
        };
    });
    for (let i = 0; i < galleryArray.length; i++) {
        galleryArray[i].originalAlt = galleryAltTags[i];
        galleryArray[i].thumbnailAlt = galleryAltTags[i];
    }
    // this one works
    return galleryArray;
};
exports.createImgGalArr = createImgGalArr;
// Retrieves Home page image URLs from server-side S3 query
// OBSOLETE USE getHomePgIms from s3Query.ts
// export const getHomeImgUrls = async () => {
// 	try {
// 		const homeImgs = await getImages('homePage');
//     if (!homeImgs?.headerImgUrl || !homeImgs?.hideawayImgUrl || !homeImgs?.cottageImgUrl) {
//       throw new Error('Something went wrong in fetching object from s3');
//     }
//     const { headerImgUrl, hideawayImgUrl, cottageImgUrl } = homeImgs;
// 		if (headerImgUrl && hideawayImgUrl && cottageImgUrl) {
// 			return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
// 		}
// 	} catch (err) {
// 		throw new Error('there was an error fetching homepage images');
// 	}
// };
//# sourceMappingURL=helpers.js.map