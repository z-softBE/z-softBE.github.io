let searchVisible = 0;
let transparent = true;
let contact = false;
let totalPrice = 500;

$(document).on('input', 'input[type="range"]', (e) => {
    const outputSelector = e.target.getAttribute('data-output');
    const max = Number(e.target.getAttribute('max'));
    let value = Number(e.target.value);

    if (outputSelector && value) {
        if (value >= max) {
            value += '+';
        }
        $(outputSelector).html(value);
    }
});

$(document).on('change', '#colors', (e) => {
    if (e.target.checked) {
        $('#color-pickers').show();
    } else {
        $('#color-pickers').hide();
    }
});

$(document).on('change', '#contact', (e) => {
    if (e.target.checked) {
        contact = true;
        $('#contact-fields').show();
    } else {
        contact = false;
        $('#contact-fields').hide();
    }
});

$(document).on('click', '#finish', (e) => {
    if (contact) {
        const db = new restdb('5f9ae991231ba42851b49f1c', {});
        const wizardObj = new db.wizard(buildResultObject());
        wizardObj.save((err, res) =>  {
            if (err) {
                $('#error-msg').show();
            } else {
                $('#contact-wrapper').hide();
                $('#success-msg').show();
                $('#finish').hide();
                $('#previous').hide();
            }
        })
    } else {
        window.location = '/';
    }
});

$(document).ready(function () {

    const onToggleText = $('body').attr('data-on-toggle');
    const offToggleText = $('body').attr('data-off-toggle');

    $('#color-pickers').hide();
    $('#contact-fields').hide();
    $('#success-msg').hide();
    $('#error-msg').hide();

    $('input[type="range"]').rangeslider({
        polyfill: false
    });

    /*  Activate the tooltips      */
    $('[rel="tooltip"]').tooltip();

    // Code for the Validator
    var $validator = $('.wizard-card form').validate({
        rules: {
            firstname: {
                required: true,
                minlength: 3
            },
            lastname: {
                required: true,
                minlength: 3
            },
            email: {
                required: true
            }
        },
    });

    // Wizard Initialization
    $('.wizard-card').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'nextSelector': '.btn-next',
        'previousSelector': '.btn-previous',

        onNext: function (tab, navigation, index) {
            var $valid = $('.wizard-card form').valid();
            if (!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },

        onInit: function (tab, navigation, index) {

            //check number of tabs and fill the entire row
            var $total = navigation.find('li').length;
            $width = 100 / $total;

            navigation.find('li').css('width', $width + '%');

            $('.wizard-container').removeAttr('style');

        },

        onTabClick: function (tab, navigation, index) {
            return false;
        },

        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;

            var $wizard = navigation.closest('.wizard-card');

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $($wizard).find('.btn-next').hide();
                $($wizard).find('.btn-finish').show();
                setOverview();
            } else {
                $($wizard).find('.btn-next').show();
                $($wizard).find('.btn-finish').hide();
            }

            //update progress
            var move_distance = 100 / $total;
            move_distance = move_distance * (index) + move_distance / 2;

            $wizard.find($('.progress-bar')).css({width: move_distance + '%'});
            //e.relatedTarget // previous tab

            $wizard.find($('.wizard-card .nav-pills li.active a .icon-circle')).addClass('checked');
        }
    });


    // Prepare the preview for profile picture
    $('[data-toggle="wizard-radio"]').click(function () {
        wizard = $(this).closest('.wizard-card');
        wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
        $(this).addClass('active');
        $(wizard).find('[type="radio"]').removeAttr('checked');
        $(this).find('[type="radio"]').attr('checked', 'true');
    });

    $('[data-toggle="wizard-checkbox"]').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).find('[type="checkbox"]').removeAttr('checked');
        } else {
            $(this).addClass('active');
            $(this).find('[type="checkbox"]').attr('checked', 'true');
        }
    });

    $('.set-full-height').css('height', 'auto');

});

function setOverview() {
    // Form Values
    const pagesAmount = Number($('input[name="pages"]').val());
    const layoutAmount = Number($('input[name="layouts"]').val());
    const wantsNewLogo = $('input[name="logo"]').is(":checked");
    const knowsColors = $('input[name="colors"]').is(":checked");
    const wantsMultipleLanguages = $('input[name="multiple-languages"]').is(":checked");
    const wantsCms = $('input[name="cms"]').is(":checked");
    const wantsNewsLetters = $('input[name="news-letters"]').is(":checked");
    const wantsECom = $('input[name="e-com"]').is(":checked");
    const wantsSocialMediaIntegration = $('input[name="social-media-integration"]').is(":checked");

    // Bill fields
    const billPageAmount = $('#bill-page-amount');
    const billPageAmountPrice = $('#bill-page-amount-price');
    const billLayoutAmount = $('#bill-layout-amount');
    const billLayoutAmountPrice = $('#bill-layout-amount-price');
    const logoRow = $('#bill-logo');
    const colorsRow = $('#bill-colors');
    const multiLangRow = $('#bill-multi-lang');
    const cmsRow = $('#bill-cms');
    const newsLetterRow = $('#bill-newsletters');
    const eComRow = $('#bill-e-com');
    const socialMediaRow = $('#bill-social-media');
    const total = $('#bill-total');

    // Reset bill
    billPageAmount.html(0);
    billPageAmountPrice.html('&euro; 0');
    billLayoutAmount.html(0);
    billLayoutAmountPrice.html('&euro; 0');
    logoRow.hide();
    colorsRow.hide();
    multiLangRow.hide();
    cmsRow.hide();
    newsLetterRow.hide();
    eComRow.hide();
    socialMediaRow.hide();
    total.html('&euro; 0');

    let price = 500;

    const pagesPrice = (pagesAmount - 1) * 15;
    billPageAmount.html(pagesAmount);
    billPageAmountPrice.html('&euro; ' + pagesPrice);
    price += pagesPrice;

    const layoutPrice = (layoutAmount - 1) * 100;
    billLayoutAmount.html(layoutAmount);
    billLayoutAmountPrice.html('&euro; ' + layoutPrice);
    price += layoutPrice;

    if (wantsNewLogo) {
        price += 300;
        logoRow.show();
    }

    if (knowsColors) {
        price -= 50;
        colorsRow.show();
    }

    if (wantsMultipleLanguages) {
        price += 150;
        multiLangRow.show();
    }

    if (wantsCms) {
        price += 400;
        cmsRow.show();
    }

    if (wantsNewsLetters) {
        price += 250;
        newsLetterRow.show();
    }

    if (wantsECom) {
        price += 1000;
        eComRow.show();
    }

    if (wantsSocialMediaIntegration) {
        price += 100;
        socialMediaRow.show();
    }

    totalPrice = price;
    total.html('&euro; ' + price);
}

function buildResultObject() {
    const pagesAmount = Number($('input[name="pages"]').val());
    const layoutAmount = Number($('input[name="layouts"]').val());
    const wantsNewLogo = $('input[name="logo"]').is(":checked");
    const knowsColors = $('input[name="colors"]').is(":checked");
    const colors = knowsColors ? buildColorsObject() : {};
    const wantsMultipleLanguages = $('input[name="multiple-languages"]').is(":checked");
    const wantsCms = $('input[name="cms"]').is(":checked");
    const wantsNewsLetters = $('input[name="news-letters"]').is(":checked");
    const wantsECom = $('input[name="e-com"]').is(":checked");
    const wantsSocialMediaIntegration = $('input[name="social-media-integration"]').is(":checked");

    // contact info
    const name = $('input[name="name"]').val();
    const email = $('input[name="email"]').val();
    const company = $('input[name="company"]').val();
    const phone = $('input[name="phone"]').val();
    const deadline = $('input[name="deadline"]').val();

    return  {
        name: name,
        company: company,
        email: email,
        phone: phone,
        pagesAmount:  pagesAmount,
        numberOfLayouts: layoutAmount,
        colors: colors,
        multipleLanguages: wantsMultipleLanguages,
        cms: wantsCms,
        newsletters: wantsNewsLetters,
        ecommmerce: wantsECom,
        socialMediaIntegration: wantsSocialMediaIntegration,
        deadline: deadline,
        newLogo: wantsNewLogo,
        knowsColors: knowsColors,
        totalFromSite: totalPrice
    }
}

function buildColorsObject() {
    return {
        color1: $('input[name="color1"]').val(),
        color2: $('input[name="color2"]').val(),
        color3: $('input[name="color3"]').val()
    };
}