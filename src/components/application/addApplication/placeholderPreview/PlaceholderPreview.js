import React from 'react';

import PlaceholderItem from '../placeholderItem/PlaceholderItem';
import classes from './PlaceholderPreview.module.sass';

const PlaceholderPreview = ({ type, secondColor }) => {
  let complementaryStyle = {};
  if (secondColor) {
    complementaryStyle = {
      background: secondColor
    };
  }
  return (
    <div className={`${classes.placeholderPreviewWrapper}`}>
      <div
        className={`${classes.windowPlaceholder}`}
        style={complementaryStyle}
      >
        <div className={`${classes.headerMobilePreview}`}>
          {/* todo change upload pic */}
          <div className={`${classes.logoWrapper}`}>
            <p>لوگوی صفحه اصلی</p>
          </div>
        </div>
      </div>
      <div className={`${classes.placeholderWrapper}`}>
        <div className={`row`}>
          <div className={`col-5 mr-3 ${classes.placeholderHeaderItemWrapper}`}>
            <PlaceholderItem widthLogo="24px" heightLogo="24px" />
          </div>
          <div className={`col-6 mt-3`}>
            <div className={`${classes.bgBlack}`} />
            <div className={`col-8 pr-0  mt-3`}>
              <div className={`${classes.bgBlack}`} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes.gutterContent}`} />
      {type == 'horizental' ? (
        <React.Fragment>
          <ul className={`${classes.listPlaceolerItems} clearfix`}>
            <li className={`${classes.placeholderHorizentalItem}`}>
              <div className={`${classes.placeholderItemHorizentalWrapper} `}>
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem widthLogo="24px" heightLogo="24px" />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-12`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-10`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
            <li className={`${classes.placeholderHorizentalItem}`}>
              <div className={`${classes.placeholderItemHorizentalWrapper} `}>
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem widthLogo="24px" heightLogo="24px" />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-12`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-10`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
            <li className={`${classes.placeholderHorizentalItem}`}>
              <div className={`${classes.placeholderItemHorizentalWrapper} `}>
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem widthLogo="24px" heightLogo="24px" />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-12`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-10`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
            <li className={`${classes.placeholderHorizentalItem}`}>
              <div className={`${classes.placeholderItemHorizentalWrapper} `}>
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem widthLogo="24px" heightLogo="24px" />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-12`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-10`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
            <li className={`${classes.placeholderHorizentalItem}`}>
              <div className={`${classes.placeholderItemHorizentalWrapper} `}>
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem widthLogo="24px" heightLogo="24px" />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-12`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-10`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
            <li className={`${classes.placeholderHorizentalItem}`}>
              <div className={`${classes.placeholderItemHorizentalWrapper} `}>
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem widthLogo="24px" heightLogo="24px" />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-12`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
              <div className={`${classes.contentHorizentalSectionWrapper}`}>
                <div className={`${classes.contentSection} col-10`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
          </ul>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ul className={`${classes.listPlaceolerItems}`}>
            <li className={`clearfix no-gutters ${classes.placeholderItem}`}>
              <div
                className={`col-4 float-right ${
                  classes.placeholderItemWrapper
                } `}
              >
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem
                    className={`${classes.placeholderHorizental}`}
                    widthLogo="24px"
                    heightLogo="24px"
                  />
                </div>
              </div>
              <div
                className={`col-7 pr-3 float-right ${
                  classes.contentSectionWrapper
                }`}
              >
                <div className={`${classes.contentSection}`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
            <li className={`clearfix no-gutters ${classes.placeholderItem}`}>
              <div
                className={`col-4 float-right ${
                  classes.placeholderItemWrapper
                } `}
              >
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem
                    className={`${classes.placeholderHorizental}`}
                    widthLogo="24px"
                    heightLogo="24px"
                  />
                </div>
              </div>
              <div
                className={`col-7 pr-3 float-right ${
                  classes.contentSectionWrapper
                }`}
              >
                <div className={`${classes.contentSection}`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
            <li className={`clearfix no-gutters ${classes.placeholderItem}`}>
              <div
                className={`col-4 float-right ${
                  classes.placeholderItemWrapper
                } `}
              >
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem
                    className={`${classes.placeholderHorizental}`}
                    widthLogo="24px"
                    heightLogo="24px"
                  />
                </div>
              </div>
              <div
                className={`col-7 pr-3 float-right ${
                  classes.contentSectionWrapper
                }`}
              >
                <div className={`${classes.contentSection}`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
            <li className={`clearfix no-gutters ${classes.placeholderItem}`}>
              <div
                className={`col-4 float-right ${
                  classes.placeholderItemWrapper
                } `}
              >
                <div className={`${classes.placeholderSection}`}>
                  <PlaceholderItem
                    className={`${classes.placeholderHorizental}`}
                    widthLogo="24px"
                    heightLogo="24px"
                  />
                </div>
              </div>
              <div
                className={`col-7 pr-3 float-right ${
                  classes.contentSectionWrapper
                }`}
              >
                <div className={`${classes.contentSection}`}>
                  <div className={`${classes.bgBlack}`} />
                </div>
              </div>
            </li>
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};
export default PlaceholderPreview;
