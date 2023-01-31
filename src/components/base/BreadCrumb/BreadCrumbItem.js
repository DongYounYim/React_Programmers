import styled from "styled-components";
import Text from "../Text";
import Icon from "../Icon";
import PropTypes from "prop-types";

const BreadCrumbItemContainer = styled.div`
  display: inline-flex;
  align-item: center;
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const BreadcrumbItem = ({ children, href, active, __TYPE, ...props }) => {
  return (
    <BreadCrumbItemContainer {...props}>
      <Anchor href={href}>
        <Text size={14} strong={active}>
          {children}
        </Text>
      </Anchor>
      {!active && <Icon name="chevron-right" size="22" strokeWidth={1} />}
    </BreadCrumbItemContainer>
  );
};

BreadcrumbItem.defaultProps = {
  __TYPE: "BreadcrumbItem",
};

BreadcrumbItem.propTypes = {
  __TYPE: PropTypes.string,
};

export default BreadcrumbItem;
