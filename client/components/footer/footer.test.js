/* eslint-disable camelcase */
import {shallow} from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import getConfig from "../../utils/get-config";
import Footer from "./footer";

const defaultConfig = getConfig("default");
const footerLinks = [
  {
    text: {en: "link-1"},
    url: "https://link-1.com",
    authenticated: true,
  },
  {
    text: {en: "link-2"},
    url: "https://link-2.com",
    authenticated: false,
  },
  {
    text: {en: "link-3"},
    url: "https://link-3.com",
  },
];
const getLinkText = (wrapper, text) => {
  const texts = [];
  wrapper.find(text).forEach( node => {
    texts.push(node.text());
  });
  return texts;
};
const createTestProps = props => {
  return {
    language: "en",
    footer: defaultConfig.components.footer,
    ...props,
  };
};

describe("<Footer /> rendering", () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = createTestProps();
    wrapper = shallow(<Footer {...props} />);
  });
  it("should render correctly", () => {
    props = createTestProps();
    const component = renderer.create(<Footer {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });
  it("should render without links", () => {
    const links = {
      footer: {...props.footer, links: []},
    };
    props = createTestProps(links);
    wrapper = shallow(<Footer {...props} />);
    expect(wrapper.find(".owisp-footer-link")).toHaveLength(0);
  });
  it("should render secondary text", () => {
    wrapper.setProps({
      footer: {...props.footer, secondary_text: {en: "secondary text"}},
    });
    expect(
      wrapper
        .update()
        .find(".owisp-footer-row-2-inner")
        .text(),
    ).toBe("secondary text");
  });
  it("should render without authenticated links when not authenticated", () => {
    props = createTestProps();
    props.footer.links = footerLinks;
    props.isAuthenticated = false;
    wrapper = shallow(<Footer {...props} />);
    const linkText = getLinkText(wrapper, ".owisp-footer-link");
    expect(linkText).toContain("link-2");
    expect(linkText).toContain("link-3");
    expect(linkText).not.toContain("link-1");
  });
  it("should render with authenticated links when authenticated", () => {
    props = createTestProps();
    props.footer.links = footerLinks;
    props.isAuthenticated = true;
    wrapper = shallow(<Footer {...props} />);
    const linkText = getLinkText(wrapper, ".owisp-footer-link");
    expect(linkText).not.toContain("link-2");
    expect(linkText).toContain("link-3");
    expect(linkText).toContain("link-1");
  });
});
