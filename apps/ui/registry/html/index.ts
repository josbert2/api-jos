// HTML Component Registry for flyoui
// Uses Tailwind CSS classes

export interface HtmlExample {
  name: string;
  html: string;
  description?: string;
}

// accordion examples
import accordionBordered from "./accordion/accordion-bordered";
import accordionDefault from "./accordion/accordion-default";
import accordionDisabled from "./accordion/accordion-disabled";
import accordionIcon from "./accordion/accordion-icon";
import accordionShadow from "./accordion/accordion-shadow";

// advanceSelect examples
import advanceSelectActive from "./advanceSelect/advanceSelect-active";
import advanceSelectDefault from "./advanceSelect/advanceSelect-default";
import advanceSelectSizes from "./advanceSelect/advanceSelect-sizes";
import advanceSelectTag from "./advanceSelect/advanceSelect-tag";

// alert examples
import alertActions from "./alert/alert-actions";
import alertColors from "./alert/alert-colors";
import alertDefault from "./alert/alert-default";
import alertIcon from "./alert/alert-icon";
import alertOutline from "./alert/alert-outline";
import alertSoft from "./alert/alert-soft";
import alertTitle from "./alert/alert-title";

// avatar examples
import avatarDefault from "./avatar/avatar-default";
import avatarGroup from "./avatar/avatar-group";
import avatarPlaceholder from "./avatar/avatar-placeholder";
import avatarShapes from "./avatar/avatar-shapes";
import avatarSizes from "./avatar/avatar-sizes";
import avatarStatus from "./avatar/avatar-status";

// badge examples
import badgeColors from "./badge/badge-colors";
import badgeDefault from "./badge/badge-default";
import badgeIcon from "./badge/badge-icon";
import badgeOutline from "./badge/badge-outline";
import badgeSizes from "./badge/badge-sizes";
import badgeSoft from "./badge/badge-soft";

// breadcrumbs examples
import breadcrumbsBullet from "./breadcrumbs/breadcrumbs-bullet";
import breadcrumbsChevron from "./breadcrumbs/breadcrumbs-chevron";
import breadcrumbsDefault from "./breadcrumbs/breadcrumbs-default";
import breadcrumbsIcons from "./breadcrumbs/breadcrumbs-icons";

// button examples
import buttonActive from "./button/button-active";
import buttonBlock from "./button/button-block";
import buttonColors from "./button/button-colors";
import buttonDefault from "./button/button-default";
import buttonDestructive from "./button/button-destructive";
import buttonDisabled from "./button/button-disabled";
import buttonGhost from "./button/button-ghost";
import buttonGradient from "./button/button-gradient";
import buttonIcon from "./button/button-icon";
import buttonLg from "./button/button-lg";
import buttonLoading from "./button/button-loading";
import buttonOutline from "./button/button-outline";
import buttonPrimary from "./button/button-primary";
import buttonSecondary from "./button/button-secondary";
import buttonShapes from "./button/button-shapes";
import buttonSizes from "./button/button-sizes";
import buttonSm from "./button/button-sm";
import buttonSoft from "./button/button-soft";
import buttonText from "./button/button-text";
import buttonWide from "./button/button-wide";

// card examples
import cardBordered from "./card/card-bordered";
import cardDefault from "./card/card-default";
import cardHeaderFooter from "./card/card-header-footer";
import cardImage from "./card/card-image";
import cardSide from "./card/card-side";
import cardSizes from "./card/card-sizes";

// carousel examples
import carouselArrows from "./carousel/carousel-arrows";
import carouselBars from "./carousel/carousel-bars";
import carouselDefault from "./carousel/carousel-default";
import carouselDots from "./carousel/carousel-dots";

// chat examples
import chatAvatar from "./chat/chat-avatar";
import chatColors from "./chat/chat-colors";
import chatDefault from "./chat/chat-default";
import chatHeaderFooter from "./chat/chat-header-footer";

// checkbox examples
import checkboxColors from "./checkbox/checkbox-colors";
import checkboxDefault from "./checkbox/checkbox-default";
import checkboxDisabled from "./checkbox/checkbox-disabled";
import checkboxLabel from "./checkbox/checkbox-label";
import checkboxSizes from "./checkbox/checkbox-sizes";

// collapse examples
import collapseCard from "./collapse/collapse-card";
import collapseDefault from "./collapse/collapse-default";
import collapseGroup from "./collapse/collapse-group";
import collapseHidden from "./collapse/collapse-hidden";

// customOptions examples
import customOptionsDefault from "./customOptions/customOptions-default";
import customOptionsGroup from "./customOptions/customOptions-group";
import customOptionsRich from "./customOptions/customOptions-rich";
import customOptionsSoft from "./customOptions/customOptions-soft";

// diff examples
import diffDefault from "./diff/diff-default";
import diffImages from "./diff/diff-images";
import diffText from "./diff/diff-text";

// divider examples
import dividerColors from "./divider/divider-colors";
import dividerDefault from "./divider/divider-default";
import dividerPlacement from "./divider/divider-placement";
import dividerStyles from "./divider/divider-styles";
import dividerVertical from "./divider/divider-vertical";

// drawer examples
import drawerBottom from "./drawer/drawer-bottom";
import drawerDefault from "./drawer/drawer-default";
import drawerStart from "./drawer/drawer-start";
import drawerTop from "./drawer/drawer-top";

// dropdown examples
import dropdownDefault from "./dropdown/dropdown-default";
import dropdownWithHeader from "./dropdown/dropdown-with-header";
import dropdownWithIcons from "./dropdown/dropdown-with-icons";
import dropdownWithTitle from "./dropdown/dropdown-with-title";

// fileinput examples
import fileinputDefault from "./fileinput/fileinput-default";
import fileinputDisabled from "./fileinput/fileinput-disabled";
import fileinputLabel from "./fileinput/fileinput-label";
import fileinputSizes from "./fileinput/fileinput-sizes";
import fileinputStates from "./fileinput/fileinput-states";

// filter examples
import filterButtons from "./filter/filter-buttons";
import filterDefault from "./filter/filter-default";
import filterMany from "./filter/filter-many";
import filterReset from "./filter/filter-reset";

// footer examples
import footerCenter from "./footer/footer-center";
import footerDefault from "./footer/footer-default";
import footerSocial from "./footer/footer-social";
import footerWithLogo from "./footer/footer-with-logo";

// indicator examples
import indicatorButton from "./indicator/indicator-button";
import indicatorCard from "./indicator/indicator-card";
import indicatorDefault from "./indicator/indicator-default";
import indicatorPositions from "./indicator/indicator-positions";

// input examples
import inputDefault from "./input/input-default";
import inputFloating from "./input/input-floating";
import inputIcon from "./input/input-icon";
import inputSizes from "./input/input-sizes";
import inputStates from "./input/input-states";
import inputTypes from "./input/input-types";

// kbd examples
import kbdDefault from "./kbd/kbd-default";
import kbdInline from "./kbd/kbd-inline";
import kbdShortcut from "./kbd/kbd-shortcut";
import kbdSizes from "./kbd/kbd-sizes";
import kbdSymbols from "./kbd/kbd-symbols";

// label examples
import labelDefault from "./label/label-default";
import labelHelper from "./label/label-helper";
import labelInput from "./label/label-input";
import labelMessages from "./label/label-messages";

// link examples
import linkAnimated from "./link/link-animated";
import linkColors from "./link/link-colors";
import linkDefault from "./link/link-default";
import linkDisabled from "./link/link-disabled";
import linkHover from "./link/link-hover";

// loading examples
import loadingButton from "./loading/loading-button";
import loadingColors from "./loading/loading-colors";
import loadingDefault from "./loading/loading-default";
import loadingSizes from "./loading/loading-sizes";
import loadingStyles from "./loading/loading-styles";

// mask examples
import maskDefault from "./mask/mask-default";
import maskHalf from "./mask/mask-half";
import maskImage from "./mask/mask-image";
import maskShapes from "./mask/mask-shapes";
import maskStars from "./mask/mask-stars";

// menu examples
import menuDefault from "./menu/menu-default";
import menuHorizontal from "./menu/menu-horizontal";
import menuIcons from "./menu/menu-icons";
import menuSizes from "./menu/menu-sizes";
import menuTitled from "./menu/menu-titled";

// mockup examples
import mockupBrowser from "./mockup/mockup-browser";
import mockupCode from "./mockup/mockup-code";
import mockupPhone from "./mockup/mockup-phone";
import mockupWindow from "./mockup/mockup-window";

// modal examples
import modalDefault from "./modal/modal-default";
import modalForm from "./modal/modal-form";
import modalPositions from "./modal/modal-positions";
import modalSizes from "./modal/modal-sizes";

// navbar examples
import navbarDefault from "./navbar/navbar-default";
import navbarWithIcon from "./navbar/navbar-with-icon";
import navbarWithMenu from "./navbar/navbar-with-menu";
import navbarWithSearch from "./navbar/navbar-with-search";

// pinInput examples
import pinInputDefault from "./pinInput/pinInput-default";
import pinInputDisabled from "./pinInput/pinInput-disabled";
import pinInputSizes from "./pinInput/pinInput-sizes";
import pinInputUnderline from "./pinInput/pinInput-underline";

// progress examples
import progressColors from "./progress/progress-colors";
import progressDefault from "./progress/progress-default";
import progressIndeterminate from "./progress/progress-indeterminate";
import progressStriped from "./progress/progress-striped";
import progressVertical from "./progress/progress-vertical";

// radialprogress examples
import radialprogressColors from "./radialprogress/radialprogress-colors";
import radialprogressDefault from "./radialprogress/radialprogress-default";
import radialprogressFilled from "./radialprogress/radialprogress-filled";
import radialprogressSizes from "./radialprogress/radialprogress-sizes";
import radialprogressThickness from "./radialprogress/radialprogress-thickness";

// radio examples
import radioColors from "./radio/radio-colors";
import radioDefault from "./radio/radio-default";
import radioDisabled from "./radio/radio-disabled";
import radioGroup from "./radio/radio-group";
import radioInset from "./radio/radio-inset";
import radioSizes from "./radio/radio-sizes";

// range examples
import rangeColors from "./range/range-colors";
import rangeDefault from "./range/range-default";
import rangeDisabled from "./range/range-disabled";
import rangeSizes from "./range/range-sizes";
import rangeSteps from "./range/range-steps";

// select examples
import selectDefault from "./select/select-default";
import selectDisabled from "./select/select-disabled";
import selectFloating from "./select/select-floating";
import selectSizes from "./select/select-sizes";
import selectStates from "./select/select-states";

// skeleton examples
import skeletonAnimated from "./skeleton/skeleton-animated";
import skeletonCard from "./skeleton/skeleton-card";
import skeletonDefault from "./skeleton/skeleton-default";
import skeletonProfile from "./skeleton/skeleton-profile";
import skeletonStriped from "./skeleton/skeleton-striped";

// stack examples
import stackDefault from "./stack/stack-default";
import stackImages from "./stack/stack-images";
import stackSide from "./stack/stack-side";
import stackTop from "./stack/stack-top";

// stat examples
import statActions from "./stat/stat-actions";
import statDefault from "./stat/stat-default";
import statFigure from "./stat/stat-figure";
import statMultiple from "./stat/stat-multiple";
import statVertical from "./stat/stat-vertical";

// status examples
import statusColors from "./status/status-colors";
import statusDefault from "./status/status-default";
import statusPulse from "./status/status-pulse";
import statusSizes from "./status/status-sizes";
import statusWithLabel from "./status/status-with-label";

// swap examples
import swapDefault from "./swap/swap-default";
import swapFlip from "./swap/swap-flip";
import swapIcon from "./swap/swap-icon";
import swapRotate from "./swap/swap-rotate";

// switches examples
import switchesColors from "./switches/switches-colors";
import switchesDefault from "./switches/switches-default";
import switchesDisabled from "./switches/switches-disabled";
import switchesLabel from "./switches/switches-label";
import switchesOutline from "./switches/switches-outline";
import switchesSizes from "./switches/switches-sizes";

// tab examples
import tabBordered from "./tab/tab-bordered";
import tabDefault from "./tab/tab-default";
import tabLifted from "./tab/tab-lifted";
import tabSizes from "./tab/tab-sizes";
import tabVertical from "./tab/tab-vertical";

// table examples
import tableBorderless from "./table/table-borderless";
import tableDefault from "./table/table-default";
import tableHover from "./table/table-hover";
import tableSizes from "./table/table-sizes";
import tableStriped from "./table/table-striped";

// textarea examples
import textareaDefault from "./textarea/textarea-default";
import textareaDisabled from "./textarea/textarea-disabled";
import textareaFloating from "./textarea/textarea-floating";
import textareaSizes from "./textarea/textarea-sizes";
import textareaStates from "./textarea/textarea-states";

// timeline examples
import timelineCompact from "./timeline/timeline-compact";
import timelineDefault from "./timeline/timeline-default";
import timelineSnapIcon from "./timeline/timeline-snap-icon";
import timelineVertical from "./timeline/timeline-vertical";

// tooltip examples
import tooltipColors from "./tooltip/tooltip-colors";
import tooltipDefault from "./tooltip/tooltip-default";
import tooltipIcon from "./tooltip/tooltip-icon";
import tooltipPositions from "./tooltip/tooltip-positions";

// validation examples
import validationForm from "./validation/validation-form";
import validationMessages from "./validation/validation-messages";
import validationSelection from "./validation/validation-selection";
import validationStates from "./validation/validation-states";

export const HtmlIndex: Record<string, HtmlExample> = {
  // accordion
  [accordionBordered.name]: accordionBordered,
  [accordionDefault.name]: accordionDefault,
  [accordionDisabled.name]: accordionDisabled,
  [accordionIcon.name]: accordionIcon,
  [accordionShadow.name]: accordionShadow,
  // advanceSelect
  [advanceSelectActive.name]: advanceSelectActive,
  [advanceSelectDefault.name]: advanceSelectDefault,
  [advanceSelectSizes.name]: advanceSelectSizes,
  [advanceSelectTag.name]: advanceSelectTag,
  // alert
  [alertActions.name]: alertActions,
  [alertColors.name]: alertColors,
  [alertDefault.name]: alertDefault,
  [alertIcon.name]: alertIcon,
  [alertOutline.name]: alertOutline,
  [alertSoft.name]: alertSoft,
  [alertTitle.name]: alertTitle,
  // avatar
  [avatarDefault.name]: avatarDefault,
  [avatarGroup.name]: avatarGroup,
  [avatarPlaceholder.name]: avatarPlaceholder,
  [avatarShapes.name]: avatarShapes,
  [avatarSizes.name]: avatarSizes,
  [avatarStatus.name]: avatarStatus,
  // badge
  [badgeColors.name]: badgeColors,
  [badgeDefault.name]: badgeDefault,
  [badgeIcon.name]: badgeIcon,
  [badgeOutline.name]: badgeOutline,
  [badgeSizes.name]: badgeSizes,
  [badgeSoft.name]: badgeSoft,
  // breadcrumbs
  [breadcrumbsBullet.name]: breadcrumbsBullet,
  [breadcrumbsChevron.name]: breadcrumbsChevron,
  [breadcrumbsDefault.name]: breadcrumbsDefault,
  [breadcrumbsIcons.name]: breadcrumbsIcons,
  // button
  [buttonActive.name]: buttonActive,
  [buttonBlock.name]: buttonBlock,
  [buttonColors.name]: buttonColors,
  [buttonDefault.name]: buttonDefault,
  [buttonDestructive.name]: buttonDestructive,
  [buttonDisabled.name]: buttonDisabled,
  [buttonGhost.name]: buttonGhost,
  [buttonGradient.name]: buttonGradient,
  [buttonIcon.name]: buttonIcon,
  [buttonLg.name]: buttonLg,
  [buttonLoading.name]: buttonLoading,
  [buttonOutline.name]: buttonOutline,
  [buttonPrimary.name]: buttonPrimary,
  [buttonSecondary.name]: buttonSecondary,
  [buttonShapes.name]: buttonShapes,
  [buttonSizes.name]: buttonSizes,
  [buttonSm.name]: buttonSm,
  [buttonSoft.name]: buttonSoft,
  [buttonText.name]: buttonText,
  [buttonWide.name]: buttonWide,
  // card
  [cardBordered.name]: cardBordered,
  [cardDefault.name]: cardDefault,
  [cardHeaderFooter.name]: cardHeaderFooter,
  [cardImage.name]: cardImage,
  [cardSide.name]: cardSide,
  [cardSizes.name]: cardSizes,
  // carousel
  [carouselArrows.name]: carouselArrows,
  [carouselBars.name]: carouselBars,
  [carouselDefault.name]: carouselDefault,
  [carouselDots.name]: carouselDots,
  // chat
  [chatAvatar.name]: chatAvatar,
  [chatColors.name]: chatColors,
  [chatDefault.name]: chatDefault,
  [chatHeaderFooter.name]: chatHeaderFooter,
  // checkbox
  [checkboxColors.name]: checkboxColors,
  [checkboxDefault.name]: checkboxDefault,
  [checkboxDisabled.name]: checkboxDisabled,
  [checkboxLabel.name]: checkboxLabel,
  [checkboxSizes.name]: checkboxSizes,
  // collapse
  [collapseCard.name]: collapseCard,
  [collapseDefault.name]: collapseDefault,
  [collapseGroup.name]: collapseGroup,
  [collapseHidden.name]: collapseHidden,
  // customOptions
  [customOptionsDefault.name]: customOptionsDefault,
  [customOptionsGroup.name]: customOptionsGroup,
  [customOptionsRich.name]: customOptionsRich,
  [customOptionsSoft.name]: customOptionsSoft,
  // diff
  [diffDefault.name]: diffDefault,
  [diffImages.name]: diffImages,
  [diffText.name]: diffText,
  // divider
  [dividerColors.name]: dividerColors,
  [dividerDefault.name]: dividerDefault,
  [dividerPlacement.name]: dividerPlacement,
  [dividerStyles.name]: dividerStyles,
  [dividerVertical.name]: dividerVertical,
  // drawer
  [drawerBottom.name]: drawerBottom,
  [drawerDefault.name]: drawerDefault,
  [drawerStart.name]: drawerStart,
  [drawerTop.name]: drawerTop,
  // dropdown
  [dropdownDefault.name]: dropdownDefault,
  [dropdownWithHeader.name]: dropdownWithHeader,
  [dropdownWithIcons.name]: dropdownWithIcons,
  [dropdownWithTitle.name]: dropdownWithTitle,
  // fileinput
  [fileinputDefault.name]: fileinputDefault,
  [fileinputDisabled.name]: fileinputDisabled,
  [fileinputLabel.name]: fileinputLabel,
  [fileinputSizes.name]: fileinputSizes,
  [fileinputStates.name]: fileinputStates,
  // filter
  [filterButtons.name]: filterButtons,
  [filterDefault.name]: filterDefault,
  [filterMany.name]: filterMany,
  [filterReset.name]: filterReset,
  // footer
  [footerCenter.name]: footerCenter,
  [footerDefault.name]: footerDefault,
  [footerSocial.name]: footerSocial,
  [footerWithLogo.name]: footerWithLogo,
  // indicator
  [indicatorButton.name]: indicatorButton,
  [indicatorCard.name]: indicatorCard,
  [indicatorDefault.name]: indicatorDefault,
  [indicatorPositions.name]: indicatorPositions,
  // input
  [inputDefault.name]: inputDefault,
  [inputFloating.name]: inputFloating,
  [inputIcon.name]: inputIcon,
  [inputSizes.name]: inputSizes,
  [inputStates.name]: inputStates,
  [inputTypes.name]: inputTypes,
  // kbd
  [kbdDefault.name]: kbdDefault,
  [kbdInline.name]: kbdInline,
  [kbdShortcut.name]: kbdShortcut,
  [kbdSizes.name]: kbdSizes,
  [kbdSymbols.name]: kbdSymbols,
  // label
  [labelDefault.name]: labelDefault,
  [labelHelper.name]: labelHelper,
  [labelInput.name]: labelInput,
  [labelMessages.name]: labelMessages,
  // link
  [linkAnimated.name]: linkAnimated,
  [linkColors.name]: linkColors,
  [linkDefault.name]: linkDefault,
  [linkDisabled.name]: linkDisabled,
  [linkHover.name]: linkHover,
  // loading
  [loadingButton.name]: loadingButton,
  [loadingColors.name]: loadingColors,
  [loadingDefault.name]: loadingDefault,
  [loadingSizes.name]: loadingSizes,
  [loadingStyles.name]: loadingStyles,
  // mask
  [maskDefault.name]: maskDefault,
  [maskHalf.name]: maskHalf,
  [maskImage.name]: maskImage,
  [maskShapes.name]: maskShapes,
  [maskStars.name]: maskStars,
  // menu
  [menuDefault.name]: menuDefault,
  [menuHorizontal.name]: menuHorizontal,
  [menuIcons.name]: menuIcons,
  [menuSizes.name]: menuSizes,
  [menuTitled.name]: menuTitled,
  // mockup
  [mockupBrowser.name]: mockupBrowser,
  [mockupCode.name]: mockupCode,
  [mockupPhone.name]: mockupPhone,
  [mockupWindow.name]: mockupWindow,
  // modal
  [modalDefault.name]: modalDefault,
  [modalForm.name]: modalForm,
  [modalPositions.name]: modalPositions,
  [modalSizes.name]: modalSizes,
  // navbar
  [navbarDefault.name]: navbarDefault,
  [navbarWithIcon.name]: navbarWithIcon,
  [navbarWithMenu.name]: navbarWithMenu,
  [navbarWithSearch.name]: navbarWithSearch,
  // pinInput
  [pinInputDefault.name]: pinInputDefault,
  [pinInputDisabled.name]: pinInputDisabled,
  [pinInputSizes.name]: pinInputSizes,
  [pinInputUnderline.name]: pinInputUnderline,
  // progress
  [progressColors.name]: progressColors,
  [progressDefault.name]: progressDefault,
  [progressIndeterminate.name]: progressIndeterminate,
  [progressStriped.name]: progressStriped,
  [progressVertical.name]: progressVertical,
  // radialprogress
  [radialprogressColors.name]: radialprogressColors,
  [radialprogressDefault.name]: radialprogressDefault,
  [radialprogressFilled.name]: radialprogressFilled,
  [radialprogressSizes.name]: radialprogressSizes,
  [radialprogressThickness.name]: radialprogressThickness,
  // radio
  [radioColors.name]: radioColors,
  [radioDefault.name]: radioDefault,
  [radioDisabled.name]: radioDisabled,
  [radioGroup.name]: radioGroup,
  [radioInset.name]: radioInset,
  [radioSizes.name]: radioSizes,
  // range
  [rangeColors.name]: rangeColors,
  [rangeDefault.name]: rangeDefault,
  [rangeDisabled.name]: rangeDisabled,
  [rangeSizes.name]: rangeSizes,
  [rangeSteps.name]: rangeSteps,
  // select
  [selectDefault.name]: selectDefault,
  [selectDisabled.name]: selectDisabled,
  [selectFloating.name]: selectFloating,
  [selectSizes.name]: selectSizes,
  [selectStates.name]: selectStates,
  // skeleton
  [skeletonAnimated.name]: skeletonAnimated,
  [skeletonCard.name]: skeletonCard,
  [skeletonDefault.name]: skeletonDefault,
  [skeletonProfile.name]: skeletonProfile,
  [skeletonStriped.name]: skeletonStriped,
  // stack
  [stackDefault.name]: stackDefault,
  [stackImages.name]: stackImages,
  [stackSide.name]: stackSide,
  [stackTop.name]: stackTop,
  // stat
  [statActions.name]: statActions,
  [statDefault.name]: statDefault,
  [statFigure.name]: statFigure,
  [statMultiple.name]: statMultiple,
  [statVertical.name]: statVertical,
  // status
  [statusColors.name]: statusColors,
  [statusDefault.name]: statusDefault,
  [statusPulse.name]: statusPulse,
  [statusSizes.name]: statusSizes,
  [statusWithLabel.name]: statusWithLabel,
  // swap
  [swapDefault.name]: swapDefault,
  [swapFlip.name]: swapFlip,
  [swapIcon.name]: swapIcon,
  [swapRotate.name]: swapRotate,
  // switches
  [switchesColors.name]: switchesColors,
  [switchesDefault.name]: switchesDefault,
  [switchesDisabled.name]: switchesDisabled,
  [switchesLabel.name]: switchesLabel,
  [switchesOutline.name]: switchesOutline,
  [switchesSizes.name]: switchesSizes,
  // tab
  [tabBordered.name]: tabBordered,
  [tabDefault.name]: tabDefault,
  [tabLifted.name]: tabLifted,
  [tabSizes.name]: tabSizes,
  [tabVertical.name]: tabVertical,
  // table
  [tableBorderless.name]: tableBorderless,
  [tableDefault.name]: tableDefault,
  [tableHover.name]: tableHover,
  [tableSizes.name]: tableSizes,
  [tableStriped.name]: tableStriped,
  // textarea
  [textareaDefault.name]: textareaDefault,
  [textareaDisabled.name]: textareaDisabled,
  [textareaFloating.name]: textareaFloating,
  [textareaSizes.name]: textareaSizes,
  [textareaStates.name]: textareaStates,
  // timeline
  [timelineCompact.name]: timelineCompact,
  [timelineDefault.name]: timelineDefault,
  [timelineSnapIcon.name]: timelineSnapIcon,
  [timelineVertical.name]: timelineVertical,
  // tooltip
  [tooltipColors.name]: tooltipColors,
  [tooltipDefault.name]: tooltipDefault,
  [tooltipIcon.name]: tooltipIcon,
  [tooltipPositions.name]: tooltipPositions,
  // validation
  [validationForm.name]: validationForm,
  [validationMessages.name]: validationMessages,
  [validationSelection.name]: validationSelection,
  [validationStates.name]: validationStates,
};
